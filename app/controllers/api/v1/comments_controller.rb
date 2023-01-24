module Api
  module V1
    class CommentsController < ApplicationController
      skip_before_action :authenticate_request

      def index
        @comments = Comment.where(post_id: params[:post_id]).where(parent_id: nil).order(created_at: :desc)

        render json: CommentSerializer.new(@comments).serializable_hash.to_json
      end

      def create
        @comment = Comment.new(comment_params)

        if @comment.save
          render json: CommentSerializer.new(@comment).serializable_hash.to_json
        else
          render json: { error: @comment.errors.messages }, status: :unprocessable_entity
        end
      end

      def update
        @comment = Comment.find(params[:id])

        if @comment.update(comment_params)
          render json: CommentSerializer.new(@comment).serializable_hash.to_json
        else
          render json: { error: @comment.error.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @comment = Comment.find(params[:id])

        if @comment.destroy
          render json: CommentSerializer.new(@comment).serializable_hash.to_json
        else
          render json: { error: @comment.error.messages }, status: :unprocessable_entity
        end
      end

      private
      def comment_params
        params.require(:comment).permit(:body, :user_id, :post_id, :parent_id)
      end
    end
  end
end