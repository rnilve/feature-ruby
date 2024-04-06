require "test_helper"

class DataControllerTest < ActionDispatch::IntegrationTest
  setup do
    @datum = data(:one)
  end

  test "should get index" do
    get data_url, as: :json
    assert_response :success
  end

  test "should create datum" do
    assert_difference("Datum.count") do
      post data_url, params: { datum: { dataGeo: @datum.dataGeo } }, as: :json
    end

    assert_response :created
  end

  test "should show datum" do
    get datum_url(@datum), as: :json
    assert_response :success
  end

  test "should update datum" do
    patch datum_url(@datum), params: { datum: { dataGeo: @datum.dataGeo } }, as: :json
    assert_response :success
  end

  test "should destroy datum" do
    assert_difference("Datum.count", -1) do
      delete datum_url(@datum), as: :json
    end

    assert_response :no_content
  end
end
