Rails.application.routes.draw do
  namespace :api do
    resources :earthquakes, only: [:index, :show, :create, :update, :destroy], path: 'features' do
      resources :comments, only: [:create]
    end
    resources :data
  end

  # Endpoint para verificar la salud de la aplicación
  get "up" => "rails/health#show", as: :rails_health_check

  # Ruta de raíz, si es necesario
  # root "controller#action"
end
