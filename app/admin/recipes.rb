ActiveAdmin.register Recipe do
  permit_params :title, :estimated_time, :instructions
end
