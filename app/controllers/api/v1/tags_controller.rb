module Api
  module V1
    class TagsController < ApplicationController
      skip_before_action :authenticate_request

      def index
        @tags = Tag.all

        render json: TagSerializer.new(@tags).serializable_hash.to_json
      end
    end
  end
end