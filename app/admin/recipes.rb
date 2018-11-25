ActiveAdmin.register Recipe do
  form do |f|
    f.inputs 'Recipe' do
      f.input :title
      f.input :estimated_time
      f.input :instructions
    end

    f.inputs 'Tags' do
      f.input :tag_ids, as: :check_boxes, collection: Tag.all, label: "Tags"
    end

    f.actions
  end

  index do |f|
    column :title
    column :estimated_time
    column :instructions
    column ("Tags") { |b| b.tags.map(&:name).join(", ") }

    f.actions
  end

  show do
    attributes_table do
      row :title
      row :estimated_time
      row :instructions
      row ("Tags") { |b| b.tags.map(&:name).join(", ") }
    end
  end

  controller do
    def create
      @recipe = Recipe.new(recipe_params)
      tags = params[:recipe].require(:tag_ids).presence
      tags.each do |tag_id|
        tag = Tag.find_by(id: tag_id)
        @recipe.tags << tag if tag
      end
      if @recipe.save
        flash[:notice] = "Recipe successfully created!"
        redirect_to admin_recipe_path(@recipe.id)
      else
        flash[:alert] = "Error! Recipe could not be created."
        redirect_to admin_recipes_path
      end
    end

    def update
      resource.update_attributes(recipe_params)
      tags = params[:recipe].require(:tag_ids).presence
      resource.tags = []
      tags.each do |tag_id|
        tag = Tag.find_by(id: tag_id)
        resource.tags << tag if tag
      end
      if resource.save
        flash[:notice] = "Recipe successfully updated!"
        redirect_to admin_recipe_path(resource.id)
      else
        flash[:alert] = "Error! Recipe could not be updated."
        redirect_to admin_recipes_path
      end
    end

    private

    def recipe_params
     @recipe_params ||= params.require(:recipe).permit(:estimated_time, :title, :instructions)
    end
  end
end
