@sometag
Feature: Second Feature
  As a user,
  I want a test a not required feature
  So that I can verify the report is generated correctly

  Background:
    Given a background

  Scenario: A non required feature scenario
    When step not completed in previous version but not required
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then step not completed in previous version but not required
      | PASS | 0.38.01-v201806130941 | Tester One |  |
