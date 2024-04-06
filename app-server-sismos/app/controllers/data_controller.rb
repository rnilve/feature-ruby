require 'httparty'

class DataController < ApplicationController
  before_action :set_datum, only: %i[  ]

  # GET /data
  def index
    if obtener_datos
      render json: @data
    else
      render json: { error: 'No se pudieron obtener los datos de la API' }, status: :internal_server_error
    end
  end


  private
  
  def obtener_datos
    response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  
    if response.success?
      data = JSON.parse(response.body)['features']
      data.each do |feature|
        attributes = {
          title: feature['properties']['title'],
          url: feature['properties']['url'],
          place: feature['properties']['place'],
          mag: feature['properties']['mag'],
          magType: feature['properties']['magType'],
          longitude: feature['geometry']['coordinates'][0],
          latitude: feature['geometry']['coordinates'][1],
          code: feature['properties']['code']
        }
        
        Earthquake.create(attributes) unless Earthquake.exists?(title: attributes[:title])
      end
      @data = data
    else
      @data = { error: 'No se pudieron obtener los datos' }
      false
    end
  end
end
