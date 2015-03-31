Feature: Testing Deserializer
  As a user
  I want to read in feature files with Cucumber
  and create, modify, or add TestResult objects from tables

  Background:
    Given that cucumber-js is installed
    And there are sample feature files

  Scenario: Reading feature file
    When the deserializer is called
    Then the feature files are loaded
    And the TestResults are added
