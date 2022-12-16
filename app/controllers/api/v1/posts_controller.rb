module Api
  module V1
    class PostsController < ApplicationController
      def index
        @posts = Post.all
        
        render json: PostSerializer.new(@posts).serializable_hash.to_json
      end

      def show
        @post = Post.find(params[:id])

        render json: PostSerializer.new(@post).serializable_hash.to_json
      end

      def create
        @post = Post.new(post_params)

        if post.save
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: airline.error.messages }, status: :unprocessable entity
        end
      end

      def update
        @post = Post.find(params[:id])

        if post.update(post_params)
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: airline.error.messages }, status: :unprocessable entity
        end
      end

      def destroy
        @post = Post.find(params[:id])

        if post.destroy
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: airline.error.messages }, status: :unprocessable entity
        end
      end

      def post_params
        params.require(:title, :body)
    end
  end
end