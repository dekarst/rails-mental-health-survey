class SurveyResponsesController < ApplicationController
  def create
    survey_response = SurveyResponse.new(survey_params)
    if survey_response.save
      render json: { message: "Survey submitted successfully" }, status: :created
    else
      render json: { errors: survey_response.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:question1, :question2, :question3)
  end
end
