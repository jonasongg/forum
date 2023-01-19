module Api
  module V1
    class CommentsController < ApplicationController
      skip_before_action :authenticate_request

      def index
        @comments = Comment.where(post_id: params[:post_id]).where(parent_id: nil)

        render json: CommentSerializer.new(@comments).serializable_hash.to_json
      end
    end
  end
end