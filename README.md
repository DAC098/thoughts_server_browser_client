# Thoughts Server Browser Client

A browser client for interacting with a thoughts server using React and Typescript with the Fluent UI as a framework. Also includes the server side render templates for serving html and sending emails.

The server is available [here](https://github.com/DAC098/thoughts_server).

## Features

 - [x] Graphing for the custom fields to have a more visual representation of the data
 - [ ] Mobile compatable interface for ease of use
 - [ ] Better user accessability

## Technical Details

The files use Webpack to build and bundle javascript. React front-end using the Fluent UI as a framework. React-Router for page navigation and rendering. Redux and Redux Toolkit for global state management.

## Server Configuration

This comes with a server configuration file that specifies the the necessary information to properly use this with the server and have in send everything needed for the interface.