module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_request

      def show
        @user = User.find(params[:id])

        render json: UserSerializer.new(@user).serializable_hash.to_json
      end

      def login
        @user = User.find_by_username(params[:username])
        
        unless @user
          @user = User.new(user_params)

          unless @user.save
            render json: { error: @user.messages.error }, status: :unprocessable_entity
          end
        end

        token = jwt_encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i

        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), username: @user.username }
      end

      private
      def user_params
        params.permit(:username)
      end
    end
  end
end