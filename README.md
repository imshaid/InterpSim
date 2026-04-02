# Interpolation Simulator

## Overview

A full-stack web application for implementing and visualizing numerical interpolation methods. The system allows users to estimate unknown values between given data points and observe intermediate computational steps.

---

## Live Demo

Frontend: https://interpsim.vercel.app
Backend API: https://interpsim.onrender.com

---

## Methods Implemented

* Forward Difference Interpolation
* Backward Difference Interpolation
* Polynomial Interpolation

---

## Technology Stack

* Frontend: React (Vite), Tailwind CSS, KaTeX
* Backend: FastAPI (Python)

---

## Features

* Input-based data interpolation
* Difference table generation
* Step-by-step computation
* Graphical visualization

---

## Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API

Default backend URL:
http://127.0.0.1:8000

---

## Project Structure

```bash
backend/
  ├── app/
  │   ├── routes/
  │   ├── services/
  │   ├── models/
  │   └── main.py

frontend/
  ├── src/
  │   ├── components/
  │   ├── services/
  │   └── utils/
```

---

## Use Case

Designed as an educational tool for understanding and applying numerical interpolation techniques.
