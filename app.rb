
require 'sinatra'
require 'erb'

set :bind, '0.0.0.0'
set :port, 4567

get '/' do
  erb :index
end
