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
        
        if @user 
          if @user.authenticate(params[:password])
            token = jwt_encode(user_id: @user.id)
            render json: { token: token }
          else
            render json: { error: @user.errors.messages }, status: :unauthorized
          end
        else
          @user = User.new(user_params)

          unless @user.save
            render json: { error: @user.errors.messages }, status: :unprocessable_entity
          end
          
          token = jwt_encode(user_id: @user.id)
          render json: { token: token }
        end

      end

      private
      def user_params
        params.require(:user).permit(:username, :password)
      end
    end
  end
end