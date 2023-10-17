const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Existe algo de errado, middleware de erros disparado!";
    res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: err.stack,
    });
  };
  
  export default ErrorHandler;