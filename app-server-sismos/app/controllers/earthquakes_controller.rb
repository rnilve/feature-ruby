class EarthquakesController < ApplicationController
    before_action :set_earthquake, only: [:show, :update, :destroy]
  
    # GET /earthquakes
    def index
        page = params[:page].to_i
        page = 1 if page <= 0 # Si el número de página es menor o igual a cero, establecerlo en 1
        
        per_page = params[:per_page].to_i
        per_page = 10 if per_page <= 0 # Si el número de elementos por página es menor o igual a cero, establecerlo en 27
        per_page = 10 if per_page >= 1000
        offset = (page - 1) * per_page
      
  earthquakes = Earthquake.all
  

  if params[:mag_type].present?
    # Si mag_type es un arreglo, utilizamos el método where con un arreglo de valores
    if params[:mag_type].is_a?(Array)
      earthquakes = earthquakes.where(magType: params[:mag_type])
    else
      # Si mag_type es un solo valor, lo tratamos como tal
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
        time: earthquake.created_at.to_s, # Suponiendo que `time` debe ser la fecha de creación del registro
        tsunami: true, # Modificar según corresponda
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
      # Use callbacks to share common setup or constraints between actions.
      def set_earthquake
        @earthquake = Earthquake.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def earthquake_params
        params.require(:earthquake).permit(:title, :url, :place, :mag, :magType, :longitude, :latitude)
      end
  end
  