const express = require("express");
const bodyParser = require("body-parser");
const { DepreciationLogs } = require("./models")

const app = express(); 
const PORT = process.env.PORT || 3003;

app.use(bodyParser.json());

app.post("/depreciation", async (req, res) => {
  try {
    const depre = await DepreciationLogs.create(req.body);
    res.status(201).json(depre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/depreciation", async (req, res) => {
  try {
    const depres = await DepreciationLogs.findAll();
    res.json(depres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/depreciation/:id", async (req, res) => {
  try {
    const depre = await DepreciationLogs.findByPk(req.params.id);
    if (!depre) {
      return res.status(404).json({ error: "Depreciation not found" });
    }
    res.json(depre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/depreciation/:id", async (req, res) => {
  try {
    const depre = await DepreciationLogs.findByPk(req.params.id);
    if (!depre) {
      return res.status(404).json({ error: "Depreciation  not found" });
    }
    await depre.update(req.body);
    res.json(depre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/depreciation/:id", async (req, res) => {
  try {
    const depre = await DepreciationLogs.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "asset  not found" });
    }
    await asset.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server asset is running on http://localhost:${PORT}`);
});
