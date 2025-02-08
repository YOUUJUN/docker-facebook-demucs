from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
import shutil
import uuid

app = Flask(__name__)

# 配置上传和输出目录
UPLOAD_FOLDER = '/data/input'
OUTPUT_FOLDER = '/data/output'
ALLOWED_EXTENSIONS = {'mp3', 'wav'}

# 确保目录存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def allowed_file(filename):
    """检查文件扩展名是否允许"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    """上传音频文件并启动 Demucs 分离"""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        # 生成唯一的文件名
        unique_id = str(uuid.uuid4())
        input_path = os.path.join(UPLOAD_FOLDER, f"{unique_id}.mp3")
        file.save(input_path)

        # 调用 Demucs 进行分离
        output_path = os.path.join(OUTPUT_FOLDER, unique_id)
        os.makedirs(output_path, exist_ok=True)
        try:
            subprocess.run(
                ["python3", "-m", "demucs", "-d", "cpu", "--out", output_path, input_path],
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Demucs failed: {e.stderr.decode()}"}), 500

        # 返回分离结果的路径
        return jsonify({"message": "Separation complete", "output_path": output_path})
    else:
        return jsonify({"error": "File type not allowed"}), 400

@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    """下载分离后的音频文件"""
    return send_from_directory(OUTPUT_FOLDER, filename, as_attachment=True)


@app.route('/hello', methods=['GET'])
def hello_world():
    return 'Hello, World youjun!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3002)