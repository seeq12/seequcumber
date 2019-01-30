Feature: Third Feature
  As a user
  I want to have a feature that is required but has no results
  So that I can verify it is marked as todo

  Scenario: Scenario 1
    Given step with no results
    And step with no results
    Then step with no results
    And step with no results and a table
    Examples:
      | access_level |
      | Edit         |
      | Full Control |