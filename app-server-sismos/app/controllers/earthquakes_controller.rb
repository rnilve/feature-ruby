class EarthquakesController < ApplicationController
    before_action :set_earthquake, only: [:show, :update, :destroy]
  
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
  
  # Limitar y paginar los resultados
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
  
    # GET /earthquakes/:id
    def show
      render json: @earthquake
    end
  
    # POST /earthquakes
    def create
      @earthquake = Earthquake.new(earthquake_params)
  
      if @earthquake.save
        render json: @earthquake, status: :created, location: @earthquake
      else
        render json: @earthquake.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /earthquakes/:id
    def update
      if @earthquake.update(earthquake_params)
        render json: @earthquake
      else
        render json: @earthquake.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /earthquakes/:id
    def destroy
      @earthquake.destroy
    end
  
    private
      def set_earthquake
        @earthquake = Earthquake.find(params[:id])
      end

      def earthquake_params
        params.require(:earthquake).permit(:title, :url, :place, :mag, :magType, :longitude, :latitude)
      end
  end
  