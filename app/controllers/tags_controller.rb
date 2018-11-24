class TagsController < ApiController
  # GET /index
  def index
    @tags = Tag.all
    render json: @tags.to_json(:include => { :recipes => { :only => [:id, :title] }})
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag.to_json(:include => { :recipes => { :only => [:id, :title] }})
  end
end
