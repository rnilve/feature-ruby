class Earthquake < ApplicationRecord
  validates :title, :url, :place, :magType, :longitude, :latitude, presence: true
  validates :mag, inclusion: { in: -1.0..10.0 }
  validates :latitude, inclusion: { in: -90.0..90.0 }
  validates :longitude, inclusion: { in: -180.0..180.0 }
  validates :code, uniqueness: true
end

