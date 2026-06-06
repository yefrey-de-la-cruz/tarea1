const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let estudiantes = [];

// OBTENER
app.get("/estudiantes", (req,res)=>{
res.json(estudiantes);
});

// AGREGAR
app.post("/estudiantes", (req,res)=>{

```
estudiantes.push(req.body);

res.json({
    mensaje:"Estudiante agregado"
});
```

});

// ELIMINAR
app.delete("/estudiantes/:index",(req,res)=>{

```
const index = req.params.index;

estudiantes.splice(index,1);

res.json({
    mensaje:"Eliminado"
});
```

});

// EDITAR
app.put("/estudiantes/:index",(req,res)=>{

```
const index = req.params.index;

estudiantes[index] = req.body;

res.json({
    mensaje:"Editado"
});
```

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
