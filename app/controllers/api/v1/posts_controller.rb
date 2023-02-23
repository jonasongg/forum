module Api
  module V1
    class PostsController < ApplicationController
      skip_before_action :authenticate_request, except: [:create, :update, :destroy]

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

        if(params.has_key?(:tag))
          @post.tags << Tag.where(name: params[:tag])
        end

        if @post.save
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: @post.errors.messages }, status: :unprocessable_entity
        end
      end

      def update
        @post = Post.find(params[:id])

        if(params.has_key?(:tag))
          @post.tags << Tag.where(name: params[:tag])
        end

        if @post.update(post_params)
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: @post.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @post = Post.find(params[:id])

        if @post.destroy
          render json: PostSerializer.new(@post).serializable_hash.to_json
        else
          render json: { error: @post.errors.messages }, status: :unprocessable_entity
        end
      end

      def search
        @posts = Post.where("title LIKE :query OR body LIKE :query", query: "%#{params[:query]}%")
                     .order(created_at: :desc)

        render json: PostSerializer.new(@posts).serializable_hash.to_json
      end

      def tag_search
        @posts = Post.joins(:tags).where("tags.name LIKE :query", query: params[:tag]).order(created_at: :desc)

        render json: PostSerializer.new(@posts).serializable_hash.to_json
      end
      
      private
      def post_params
        params.require(:post).permit(:title, :body, :user_id)
      end
    end
  end
end