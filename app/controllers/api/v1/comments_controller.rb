module Api
  module V1
    class CommentsController < ApplicationController
      def index
        @comments = Comment.all

        render json: CommentSerializer.new(@comments).serializable_hash.to_json
      end
    end
  end
end