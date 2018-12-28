@journal
Feature: Fourth Feature
  As a user,
  I want a Journal
  So that I can record my thoughts and annotate things

  Background:
    Given Seeq is running as an admin user
    And the help is closed
    And Seeq data has been reset
    And a workbook with a multi-line journal entry and an annotation

  Scenario: Searching for Name should not match journal entry/annotations
    When I click on the Data tab
    And I search for "journal" in the "Name" field
    Then no search results are shown

