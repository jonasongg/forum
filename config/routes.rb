Rails.application.routes.draw do
  root "homepage#index"
  
  namespace :api do
    namespace :v1 do
      resources :posts, except: [:new, :edit]
    end
  end

  #Root path

end
