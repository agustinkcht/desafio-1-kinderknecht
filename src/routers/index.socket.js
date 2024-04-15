import productManager from '../data/fs/files/ProductManager.fs.js'

export default async (socket) => {
    console.log(`Client ${socket.id} connected`)
    socket.emit('products', await productManager.read())
    socket.on('addProduct', async data => {
        await productManager.create(data)
    });
    socket.emit('products', await productManager.read())
};

//aca van todos los emits del socket