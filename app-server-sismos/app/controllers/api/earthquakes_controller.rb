module Api
    class EarthquakesController < ApplicationController
      before_action :set_earthquake, only: [:show]
  
      # GET /earthquakes
      def index
        page = params[:page].to_i
        page = 1 if page <= 0 
  
        per_page = params[:per_page].to_i
        per_page = 10 if per_page <= 0 
        per_page = 10 if per_page >= 1000
        offset = (page - 1) * per_page
  
        earthquakes = Earthquake.all
  
        if params[:mag_type].present?
          if params[:mag_type].is_a?(Array)
            earthquakes = earthquakes.where(magType: params[:mag_type])
          else
            earthquakes = earthquakes.where(magType: params[:mag_type])
          end
        end
  
        earthquakes = earthquakes.limit(per_page).offset(offset)
  
        @earthquakes = earthquakes.map do |earthquake|
          {
            id: earthquake.id,
            type: 'feature',
            attributes: {
              external_id: earthquake.code,
              magnitude: earthquake.mag,
              place: earthquake.place,
              time: earthquake.created_at.to_s,
              tsunami: true, 
              mag_type: earthquake.magType,
              title: earthquake.title,
              coordinates: {
                longitude: earthquake.longitude,
                latitude: earthquake.latitude
              }
            },
            links: {
              external_url: earthquake.url
            }
          }
        end
  
        render json: { data: @earthquakes, pagination: { current_page: page, total: Earthquake.count, per_page: per_page } }
      end
  
      def show
        render json: @earthquake
      end
  
      private
      def set_earthquake
        @earthquake = Earthquake.find(params[:id])
      end
  
      def earthquake_params
        params.require(:earthquake).permit(:title, :url, :place, :mag, :magType, :longitude, :latitude)
      end
    end
  end
  