module Api
  module V1
    class PostsController < ApplicationController
      skip_before_action :authenticate_request, only: [:index, :show]

      def index
        @posts = Post.order(created_at: :desc)
        
        render json: PostSerializer.new(@posts).serializable_hash.to_json
      end

      def show
        @post = Post.find(params[:id])

        render json: PostSerializer.new(@post).serializable_hash.to_json
      end

      def create
        @post = Post.new(post_params)

        if @post.save
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: @post.error.messages }, status: :unprocessable_entity
        end
      end

      def update
        @post = Post.find(params[:id])

        if @post.update(post_params)
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: @post.error.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @post = Post.find(params[:id])

        if @post.destroy
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: @post.error.messages }, status: :unprocessable_entity
        end
      end

      private
      def post_params
        params.require(:post).permit(:title, :body, :user_id)
      end
    end
  end
end