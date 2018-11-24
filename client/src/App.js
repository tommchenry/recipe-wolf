import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getTags = this.getTags.bind(this)
  }

  componentDidMount () {
    this.getTags()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getTags () {
    this.fetch('/api/tags')
      .then(tags => {
        if (tags.length) {
          this.setState({tags: tags})
        } else {
          this.setState({tags: []})
        }
      })
  }

  getTag (id) {
    this.fetch(`/api/tags/${id}`)
      .then(tag => this.setState({tag: tag}))
    this.setState({recipe: ""})
  }

  getRecipe (id) {
    this.fetch(`/api/recipes/${id}`)
      .then(recipe => this.setState({recipe: recipe}))
  }

  render () {
    let {tags, tag, recipe} = this.state
    return tags
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='orange'>
          <Icon name='utensils' circular />
          <Header.Content>
            Recipe Wolf
          </Header.Content>
          <Header.Subheader>
            What do you want to make?
          </Header.Subheader>
        </Header>
        {tags && tags.length
          ? <Button.Group vertical color='orange' fluid widths={tags.length}>
            {Object.keys(tags).map((key) => {
              return <Button active={tag && tag.id === tags[key].id} fluid key={key} onClick={() => this.getTag(tags[key].id)}>
                {tags[key].name}
              </Button>
            })}
            </Button.Group>
          : <Container textAlign='center'>No tags found.</Container>
        }
        {tag
          ? <Container>
              <Divider section />
              <Header as='h2'>{tag.name}</Header>
              {tag.recipes && tag.recipes.length
                  ? <Button.Group vertical color='orange' fluid widths={tag.recipes.length}>
                    {Object.keys(tag.recipes).map((key) => {
                      return <Button active={tag.recipes && tag.recipes.id === tag.recipes[key].id} fluid key={key} onClick={() => this.getRecipe(tag.recipes[key].id)}>
                        {tag.recipes[key].title}
                      </Button>
                    })}
                  </Button.Group>
                  : <p>No recipes found tagged <strong>{tag.name}</strong></p>
              }
            </Container>
          : <Divider hidden section />
        }
      {recipe
          ?<Container>
              <Divider section />
              <Header as='h2'>{recipe.title}</Header>
              {recipe.estimated_time && <em>Estimated Time: {recipe.estimated_time} minutes</em>}
              {recipe.ingredients && recipe.ingredients.length
                  ? <Segment.Group>
                    {recipe.ingredients.map((ingredient, i) => <Segment key={i}>{ingredient.name}</Segment>)}
                    </Segment.Group>
                  : <Segment>No Ingredients</Segment>
              }
              {recipe.instructions && <p>{recipe.instructions}</p>}
          </Container>
          : <Divider hidden section />
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
