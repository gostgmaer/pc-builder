
const { FilterOptions } = require("../../utils/helper");
// const Component = require("../../models/Component");
const pcPart = require('../../models/components')

const createComponent = async (req, res) => {
  try {
    const component = new pcPart(req.body);
    const save = await component.save();
    res.status(201).json({
      statusCode: 201,
      status: "Created",
      results: { id: save.id },
      message: "component created",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      status: "Bad Request",
      results: null,
      message: error.message,
    });
  }
};

const getComponent = async (req, res) => {
  const { limit, page, filter, sort } = req.query;

  try {
    const filterquery = FilterOptions(sort, page||1, limit||50, filter);
    const data = await pcPart.find( filterquery.query,
      "-__v",
      filterquery.options);



    const length = await pcPart.countDocuments(filterquery.query);

    res.status(200).json({
      statusCode: 200,
      status: "OK",
      message: "Data retrieved successfully",
      results: data || [],
      total: length,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "Internal Server Error",
      results: null,
      message: error.message,
    });
  }
};

const getSingleComponents = async (req, res) => {
  try {
    const responseData = await pcPart.findById(req.params.id);
    if (!responseData) {
      return res.status(404).json({
        statusCode: 404,
        status: "Not Found",
        results: null,
        message: "Data not found",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        status: "OK",
        results: responseData,
        message: "Data retrieved successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "Internal Server Error",
      results: null,
      message: error.message,
    });
  }
};
const updateComponent = async (req, res) => {
  try {
    const update = await pcPart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!update) {
      return res.status(404).json({
        statusCode: 404,
        status: "Not Found",
        results: null,
        message: "Data not found",
      });
    }
    res.status(200).json({
      statusCode: 200,
      status: "OK",
      results: update,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 500,
      status: "Internal Server Error",
      results: null,
      message: error.message,
    });
  }
};
const deleteComponents = async (req, res) => {
  try {
    const response = await pcPart.findByIdAndUpdate(req.params.id, {status:"INACTIVE"}, {
      new: true,
    });
    if (!response) {
      return res.status(404).json({
        statusCode: 404,
        status: "Not Found",
        results: null,
        message: "Data not found",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "Data deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "Internal Server Error",
      results: null,
      message: error.message,
    });
  }
};




module.exports = {
  createComponent,
  getComponent,
  getSingleComponents,
  updateComponent,
  deleteComponents
};
