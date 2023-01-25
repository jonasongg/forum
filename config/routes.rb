Rails.application.routes.draw do
  get 'users/show'
  #Root path
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :posts, except: [:new, :edit] do
        resources :comments, except: [:new]
      end
      resources :users, only: [:show]
      resources :tags, only: [:index]
      post '/login', to: 'users#login'
      post '/search', to: 'posts#search'
      post '/tag', to: 'posts#tag_search'
    end
  end

  #If the route doesn't match, then go to root path
  get '/*path' => 'homepage#index'
end
