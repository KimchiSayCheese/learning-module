import { connect } from "tls";
import prisma from "../db";

// Get all
export const getUpdates = async (req, res) => {
  //   const updates = await prisma.user
  //     .findUnique({
  //       where: {
  //         id: req.user.id,
  //       },
  //       include: {
  //         products: {
  //           where: {
  //             id: req.params.id,
  //           },
  //           include: {
  //             updates: true,
  //           },
  //         },
  //       },
  //     })
  //     .products();

  //   const result = updates.reduce((allUpdates, update) => {
  //     return [...allUpdates, update];
  //   }, []);

  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: updates });
};

// Get one

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
      product: {
        belongsToId: req.user.id,
      },
    },
  });
  if (!update) {
    return res.json({ data: null });
  }

  res.json({ data: update[0] });
};

// Update one

export const updateUpdate = async (req, res) => {
  // const products = await prisma.product.findMany({
  //     where: {
  //         belongsToId: req.user.id,
  //     },
  //     include: {
  //         updates: true
  //     }
  // });
  // const updates = products.reduce((allUpdates, product) => {
  //     return [...allUpdates, ...product.updates];
  // }, []);

  // const match = updates.find(update => update.id === req.params.id);

  // if(!match) {
  //     return res.json({ message: "nope" });
  // }

  // const updatedUpdate = await prisma.update.update({
  //     where: {
  //         id: req.params.id
  //     },
  //     data: req.body
  // });

  // res.json({data:updateUpdate});

  const update = await prisma.update.updateMany({
    where: {
      id: req.params.id,
      product: {
        belongsToId: req.user.id,
      },
    },
    data: req.body,
  });

  if (!update) {
    return res.json({ message: "nope" });
  }

  const result = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: result });
};

// Create one

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.json({ message: "no" });
  }

  const update = await prisma.update.create({
    data: {
      body: req.body.body,
      title: req.body.title,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};

// Delete one

export const deleteUpdate = async (req, res) => {
  // const deleted = await prisma.update.deleteMany({
  //     where: {
  //         id: req.params.id,
  //         product: {
  //             belongsToId: req.user.id
  //         }
  //     }
  // });

  // res.json({ data: deleted });

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "nope" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
