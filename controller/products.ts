import { connectDb } from "../utils/dbConnection.ts";

interface Product {
  title: string;
  imagePoster: string;
  imageSlider: Array<String>;
  trailerGame: string;
  description: string;
  price: number;
  genre: Array<String>;
  platform: Array<String>;
  stock: number;
}

export const apiInformation = async ({ response }: { response: any;}) => {
  try {
    response.status = 200;
    response.body = "content";
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      data: error.toString(),
    };
  }
};

export const getProducts = async ({ response }: { response: any }) => {
  try {
    const productObj = await connectDb()
    const products = await productObj.find();

    response.status = 200
    response.header = "X-Response-Time"
    response.body = {
      success: true,
      data: products
    }
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      data: error.toString()
    }
  }
};

export const getProduct = async ({ params, response }: { params: { id: string }; response: any; }) => {
  try {
    const productObj = await connectDb();
    const product = await productObj.findOne({ _id: { $oid: params.id } }) ;

    response.status = 200
    response.body = {
      success: true,
      data: product
    }
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      data: error.toString()
    }
  }
};

export const addProduct = async ({ response, request }: { response: any; request: any; }) => {
  //TODO: Implementing interface to be required for new products
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      data: "No data provided",
    };
  } else {
    try {
      const product = body.value;
      const productObj = await connectDb();
      await productObj.insertOne({ product });

      response.status = 201;
      response.body = {
        success: true,
        data: product
      }
    } catch (error) {
      response.status = 500;
      response.body = {
        success: false,
        msg: error.toString()
      }
    };
  }
};

export const updateProduct = async ({ params, response, request }: { params: { id: string }; response: any; request: any; }) => {
  const body = await request.body();
  const updateProd = body.value;

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      data: "No data provided",
    };
  } else {
    try {
      const productObj = await connectDb();
      await productObj.updateOne(
        { _id: { $oid: params.id } },
        { $set: updateProd }
      );
      response.status = 202;
      response.body = {
        success: true,
        data: {
          _id: params.id,
          updateProd
        }
      }
    } catch (error) {
      response.status = 500;
      response.body = {
        success: false,
        msg: error.toString()
      }
    }
  }
}

export const deleteProduct = async ({ params, response }: { params: { id: string }; response: any }) => {
  try {
    const productObj = await connectDb();
    const product = await productObj.deleteOne({ _id: { $oid: params.id } });

    response.status = 200
    response.body = {
      success: true,
      data: product
    }
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      data: error.toString()
    }
  }
};
