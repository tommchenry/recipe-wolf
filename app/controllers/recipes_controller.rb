class RecipesController < ApiController
  # GET /index
  def index
    @recipes = Recipe.all
    render json: @recipes.to_json(:include => { :ingredients => { :only => [:id, :name] }, :tags => { :only => [:id, :name] }})
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe.to_json(:include => { :ingredients => { :only => [:id, :name] }, :tags => { :only => [:id, :name] }})
  end
end
