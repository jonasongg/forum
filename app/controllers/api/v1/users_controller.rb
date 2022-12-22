module Api
  module V1
    class UsersController < ApplicationController
      def show
        @user = User.find(params[:id])

        render json: UserSerializer.new(@user).serializable_hash.to_json
      end
    end
  end
end