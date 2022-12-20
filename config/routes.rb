Rails.application.routes.draw do
  get 'users/show'
  #Root path
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :posts, except: [:new, :edit]
      resources :users, only: [:show]
    end
  end

  #If the route doesn't match, then go to root path
  get '/*path' => 'homepage#index'
end
