
require 'httparty'

EARTHQUAKE_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'.freeze

namespace :fetch_earthquake_data do
  desc 'Fetch earthquake data from the API and store it in the database'
  task :earthquakes => :environment do
    response = HTTParty.get(EARTHQUAKE_API_URL)

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

        Earthquake.create(attributes) unless Earthquake.exists?(code: attributes[:code])
      end
      puts 'Earthquake data obtained and saved to the database.'
    else
      puts 'Error fetching data from the earthquake API.'
    end
  end
end
