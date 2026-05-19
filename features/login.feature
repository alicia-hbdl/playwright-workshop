Feature: Login

  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I open the login form
    And I enter valid credentials
    And I click the login button
    Then I should see a welcome message containing my username
    And I take a screenshot for documentation