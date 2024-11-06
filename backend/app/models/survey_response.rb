class SurveyResponse < ApplicationRecord
  # Validations
  validates :question1, presence: true
  validates :question2, presence: true, inclusion: { in: 1..5 }
  validates :question3, presence: true

  attr_encrypted :question1, key: ENV['ENCRYPTION_KEY'] || Rails.application.credentials.secret_key_base.byteslice(0, 32)
end
