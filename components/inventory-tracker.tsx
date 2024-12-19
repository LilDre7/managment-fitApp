"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'react-hot-toast';

type Category = "PRODUCTO" | "MEMBRESIA";

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  currency: "USD" | "CRC";
}

export function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "PRODUCTO",
    price: 0,
    stock: 0,
    currency: "USD",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleNewProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock && newProduct.currency) {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
      setNewProduct({
        name: "", category: "PRODUCTO", price: 0, stock: 0, currency: "USD"
      });
    }
  }

  const addProduct = () => {
    if (!newProduct) {
      toast.error("El producto no está definido.");
      return;
    }

    const { name = "", price = "", stock = "" } = newProduct;

    if (!name.trim() || price === '' || stock === '') {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (isNaN(parsedPrice) || isNaN(parsedStock) || parsedPrice < 0 || parsedStock < 0) {
      toast.error("El precio y el stock deben ser números válidos y mayores o iguales a cero.");
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parsedPrice,
      stock: parsedStock,
    };

    setProducts((prevProducts) => [...prevProducts, productToAdd]);

    setNewProduct({
      name: "",
      category: "PRODUCTO",
      price: 0,
      stock: 0,
      currency: "USD",
    });

    toast.success("Producto añadido con éxito.");
  };

  const updateProduct = () => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        price: editingProduct.price || 0,
        stock: editingProduct.stock || 0,
      };
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setEditingProduct(null);
      toast.success("Producto actualizado con éxito");
    } else {
      toast.error("No hay producto para actualizar.");
    }
  };

  const deleteProduct = (id: number) => {
    const productExists = products.some((p) => p.id === id);
    if (!productExists) {
      toast.error("El producto no existe.");
      return;
    }
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Producto eliminado con éxito");
  };
  return (
    <>
      <div className="p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">GYM SALE TRACKER</h1>
          <p>Total de productos: {products.length}</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Añadir Producto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Producto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewProduct} className="grid gap-4 py-4">
              <Input
                placeholder="Nombre del producto o cliente"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
              <Select
                value={newProduct.category}
                onValueChange={(value) =>
                  setNewProduct({ ...newProduct, category: value as Category })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCTO">PRODUCTO</SelectItem>
                  <SelectItem value="MEMBRESIA">MEMBRESIA</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Precio"
                value={newProduct.price || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value ? parseFloat(e.target.value) : 0,
                  })
                }
                required
              />
              <Input
                type="number"
                placeholder="Stock"
                value={newProduct.stock || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: e.target.value ? parseInt(e.target.value) : 0,
                  })
                }
                required
              />
              <Select
                value={newProduct.currency}
                onValueChange={(value) =>
                  setNewProduct({
                    ...newProduct,
                    currency: value as "USD" | "CRC",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">Dólares (USD)</SelectItem>
                  <SelectItem value="CRC">Colones (CRC)</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addProduct}>Añadir Producto</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Table className="relative mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.currency === "USD" ? "$" : "₡"}
                  {product.price.toFixed(2)}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => setEditingProduct(product)}
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Producto</DialogTitle>
                      </DialogHeader>
                      {editingProduct && (
                        <div className="grid gap-4 py-4">
                          <Input
                            placeholder="Nombre del producto o cliente"
                            value={editingProduct.name}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                name: e.target.value,
                              })
                            }
                          />
                          <Select
                            value={editingProduct.category}
                            onValueChange={(value) =>
                              setEditingProduct({
                                ...editingProduct,
                                category: value as Category,
                              })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PRODUCTO">PRODUCTO</SelectItem>
                              <SelectItem value="MEMBRESIA">MEMBRESIA</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            placeholder="Precio"
                            value={editingProduct.price || ""}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                price: e.target.value
                                  ? parseFloat(e.target.value)
                                  : 0,
                              })
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Stock"
                            value={editingProduct.stock || ""}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                stock: e.target.value
                                  ? parseInt(e.target.value)
                                  : 0,
                              })
                            }
                          />
                          <Select
                            value={editingProduct.currency}
                            onValueChange={(value) =>
                              setEditingProduct({
                                ...editingProduct,
                                currency: value as "USD" | "CRC",
                              })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccionar moneda" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">Dólares (USD)</SelectItem>
                              <SelectItem value="CRC">Colones (CRC)</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button onClick={updateProduct}>
                            Actualizar Producto
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}