module Api
  class CommentsController < ApplicationController
    before_action :create, only: [:create]
  
    def create
      earthquake_id = params[:earthquake_id]
      feature = Earthquake.find_by(id: earthquake_id) 
    
      if feature
        @comment = feature.comments.build(comment_params)
      
        if @comment.save
          render json: feature.comments , status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity 
        end
      else
        render json: { error: "Earthquake not found" }, status: :not_found
      end
    end
    
  
    private
  
    def comment_params
      params.require(:comment).permit(:body)
    end
  end
end
