import mongoose from "mongoose";

const { Schema } = mongoose;

const clientsSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    years: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Activo",
    },
    profileImage: {
      imageUrl: String,
      publicId: String,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "roles",
      },
    ],
  },
  {
    timestamps: true, // Añade `createdAt` y `updatedAt`
    versionKey: false, // Elimina el campo `__v` que MongoDB agrega por defecto
  }
);

// Exporta el modelo utilizando `export default`
const Clients = mongoose.model("Clients", clientsSchema);
export default Clients;
