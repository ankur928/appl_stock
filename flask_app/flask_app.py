from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
import requests

app = Flask(__name__, static_folder='../react_frontend/build')
CORS(app)

TIINGO_API_KEY = '3f8a8bed9107cad0c524a8ef99bfbb00f8853b7b'

@app.route('/financials', methods=['GET'])
def get_financials():
    symbol = 'AAPL'
    url = f'https://api.tiingo.com/tiingo/daily/{symbol}/prices?startDate=2023-06-01&endDate=2024-06-07&token={TIINGO_API_KEY}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        stock_data = response.json()

        # Mock data for financial ratios and analyst estimates
        financial_data = {
            "ticker": symbol,
            "market_cap": 2500,
            "shares_outstanding": 317,
            "pe_ratio": 1.2,
            "ps_ratio": 33.5,
            "pb_ratio": 7.9,
            "peg_ratio": 5.5,
            "current_ratio": 7.1,
            "debt_to_equity_ratio": 2.1,
            "eps": 1.7,
            "analyst_estimates": {
                "BofA": 8.2,
                "Citibank": 6.5,
                "Goldman Sachs": 7.9,
                "Morgan Stanley": 9.87,
                "J.P. Morgan": 7.5,
                "Moelis": 8.0,
                "Lazard": 7.2,
                "Evercore": 8.4
            },
            "news": {
                "article1": {
                    "sentiment": {"score": 0.9, "value": "positive"},
                    "summary": "This is Article1"
                },
                "article2": {
                    "sentiment": {"score": 0.67, "value": "negative"},
                    "summary": "This is Article2"
                },
                "article3": {
                    "sentiment": {"score": 0.559, "value": "positive"},
                    "summary": "This is Article3"
                }
            }
        }

        return jsonify({"stock_data": stock_data, "financial_data": financial_data})
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
        return jsonify({'error': 'Failed to fetch data from Tiingo due to an HTTP error'}), 500
    except Exception as e:
        print(f'Error fetching data: {e}')
        return jsonify({'error': 'Failed to fetch data from Tiingo'}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8001)
