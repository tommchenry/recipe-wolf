import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getRecipes = this.getRecipes.bind(this)
    this.getRecipe = this.getRecipe.bind(this)
  }

  componentDidMount () {
    this.getRecipes()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getRecipes () {
    this.fetch('/api/recipes')
      .then(recipes => {
        if (recipes.length) {
          this.setState({recipes: recipes})
          this.getRecipe(recipes[0].id)
        } else {
          this.setState({recipes: []})
        }
      })
  }

  getRecipe (id) {
    this.fetch(`/api/recipes/${id}`)
      .then(recipe => this.setState({recipe: recipe}))
  }

  render () {
    let {recipes, recipe} = this.state
    return recipes
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='orange'>
          <Icon name='utensils' circular />
          <Header.Content>
            Recipe Wolf
          </Header.Content>
        </Header>
        <Divider hidden section />
        {recipes && recipes.length
          ? <Button.Group vertical color='orange' fluid widths={recipes.length}>
            {Object.keys(recipes).map((key) => {
              return <Button active={recipe && recipe.id === recipes[key].id} fluid key={key} onClick={() => this.getRecipe(recipes[key].id)}>
                {recipes[key].title}
              </Button>
            })}
          </Button.Group>
          : <Container textAlign='center'>No recipes found.</Container>
        }
        <Divider section />
        {recipe &&
          <Container>
            <Header as='h2'>{recipe.title}</Header>
            {recipe.estimated_time && <p>{recipe.estimated_time} minutes</p>}
            {recipe.ingredients &&
              <Segment.Group>
                {recipe.ingredients.map((ingredient, i) => <Segment key={i}>{ingredient.name}</Segment>)}
              </Segment.Group>
            }
            {recipe.instructions && <p>{recipe.instructions}</p>}
          </Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App
