const express = require("express");
const pool = require("../db/db");
const router = express.Router();

// GET all menu items

router.get('/appetizer', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM appetizer');
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "Failed to get appetizer"});
    }
})

//get all main dishes

router.get('/makanan_utama', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM makanan_utama');
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "Failed to get main dish"});
    }
})


//get all drink

router.get('/minuman', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM minuman');
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "Failed to get drink"});
    }
})

// Tambah menu makanan utama
router.post('/add-makanan-utama', async (req, res) => {
    const { nama_makanan, harga_makanan, stock_makanan } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO makanan_utama (nama_makanan, harga_makanan, stock_makanan) VALUES ($1, $2, $3) RETURNING *',
            [nama_makanan, harga_makanan, stock_makanan]
        );
        res.status(201).json({ message: 'Makanan utama added successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add makanan utama' });
    }
});

// Update stock makanan utama
router.put('/update-makanan-utama/:id', async (req, res) => {
    const { id } = req.params;
    const { stock_makanan } = req.body;
    
    try {
        const result = await pool.query(
            'UPDATE makanan_utama SET stock_makanan = $1 WHERE id = $2 RETURNING *',
            [stock_makanan, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Makanan utama not found' });
        }
        res.json({ message: 'Makanan utama updated successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update makanan utama' });
    }
});

// Delete makanan utama
router.delete('/delete-makanan-utama/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query(
            'DELETE FROM makanan_utama WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Makanan utama not found' });
        }
        res.json({ message: 'Makanan utama deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete makanan utama' });
    }
});



module.exports = router;