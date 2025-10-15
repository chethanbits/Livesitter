import subprocess
import os
import signal

# Global variable to store the ffmpeg process
ffmpeg_process = None

def start_rtsp_conversion(rtsp_url, output_path="static/stream.m3u8"):
    """
    Convert RTSP stream to HLS format for browser playback
    
    Args:
        rtsp_url (str): The RTSP stream URL
        output_path (str): Output path for HLS playlist file
    
    Returns:
        dict: Status information
    """
    global ffmpeg_process
    
    # Stop existing stream if running
    if ffmpeg_process is not None:
        stop_rtsp_conversion()
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # FFmpeg command to convert RTSP to HLS
    cmd = [
        "ffmpeg",
        "-rtsp_transport", "tcp",  # Use TCP for more reliable streaming
        "-i", rtsp_url,
        "-c:v", "libx264",         # Video codec
        "-preset", "ultrafast",     # Fast encoding
        "-tune", "zerolatency",     # Low latency
        "-c:a", "aac",              # Audio codec
        "-f", "hls",                # HLS format
        "-hls_time", "2",           # Segment duration in seconds
        "-hls_list_size", "3",      # Number of segments in playlist
        "-hls_flags", "delete_segments+append_list",  # Delete old segments
        "-hls_segment_filename", "static/segment_%03d.ts",
        output_path
    ]
    
    # If it's not an RTSP URL, adjust the command
    if not rtsp_url.startswith("rtsp://"):
        # Remove RTSP-specific parameters for local files
        cmd = [
            "ffmpeg",
            "-i", rtsp_url,
            "-c:v", "libx264",         # Video codec
            "-preset", "ultrafast",     # Fast encoding
            "-tune", "zerolatency",     # Low latency
            "-c:a", "aac",              # Audio codec
            "-f", "hls",                # HLS format
            "-hls_time", "2",           # Segment duration in seconds
            "-hls_list_size", "3",      # Number of segments in playlist
            "-hls_flags", "delete_segments+append_list",  # Delete old segments
            "-hls_segment_filename", "static/segment_%03d.ts",
            output_path
        ]
    
    try:
        # Start ffmpeg process
        ffmpeg_process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            preexec_fn=os.setsid if os.name != 'nt' else None
        )
        
        # Give FFmpeg a moment to start and check for immediate errors
        import time
        time.sleep(1)
        
        # Check if process is still running
        if ffmpeg_process.poll() is not None:
            # Process exited immediately, get error output
            stdout, stderr = ffmpeg_process.communicate()
            error_msg = stderr.decode() if stderr else stdout.decode()
            
            # If RTSP connection failed, try with a test pattern instead
            if "Failed to resolve hostname" in error_msg or "Error opening input" in error_msg:
                print(f"RTSP stream failed: {error_msg}")
                print("Falling back to test pattern...")
                # Kill the failed process first
                if ffmpeg_process:
                    ffmpeg_process.terminate()
                    ffmpeg_process = None
                return start_test_pattern_conversion(output_path)
            
            return {
                "status": "error",
                "message": f"FFmpeg failed to start: {error_msg}"
            }
        
        return {
            "status": "started",
            "rtsp_url": rtsp_url,
            "hls_url": output_path,
            "pid": ffmpeg_process.pid
        }
    except FileNotFoundError:
        return {
            "status": "error",
            "message": "FFmpeg not found. Please install FFmpeg to use streaming functionality."
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def stop_rtsp_conversion():
    """
    Stop the running RTSP to HLS conversion process
    
    Returns:
        dict: Status information
    """
    global ffmpeg_process
    
    if ffmpeg_process is None:
        return {
            "status": "info",
            "message": "No active stream to stop"
        }
    
    try:
        # Terminate the process
        if os.name != 'nt':
            os.killpg(os.getpgid(ffmpeg_process.pid), signal.SIGTERM)
        else:
            ffmpeg_process.terminate()
        
        ffmpeg_process.wait(timeout=5)
        ffmpeg_process = None
        
        return {
            "status": "stopped",
            "message": "Stream conversion stopped successfully"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def start_test_pattern_conversion(output_path="static/stream.m3u8"):
    """
    Start a test pattern stream when RTSP fails
    """
    global ffmpeg_process
    
    # Stop existing stream if running
    if ffmpeg_process is not None:
        stop_rtsp_conversion()
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # FFmpeg command for test pattern
    cmd = [
        "ffmpeg",
        "-f", "lavfi",
        "-i", "testsrc=duration=0:size=640x480:rate=30",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-tune", "zerolatency",
        "-f", "hls",
        "-hls_time", "2",
        "-hls_list_size", "3",
        "-hls_flags", "delete_segments+append_list",
        "-hls_segment_filename", "static/segment_%03d.ts",
        output_path
    ]
    
    try:
        ffmpeg_process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            preexec_fn=os.setsid if os.name != 'nt' else None
        )
        
        import time
        time.sleep(2)  # Give it more time to start
        
        if ffmpeg_process.poll() is not None:
            stdout, stderr = ffmpeg_process.communicate()
            return {
                "status": "error",
                "message": f"Test pattern failed: {stderr.decode() if stderr else stdout.decode()}"
            }
        
        return {
            "status": "started",
            "rtsp_url": "test_pattern",
            "hls_url": output_path,
            "pid": ffmpeg_process.pid,
            "note": "Using test pattern (RTSP stream was not accessible)"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def get_stream_status():
    """
    Check if stream conversion is running
    
    Returns:
        dict: Stream status
    """
    global ffmpeg_process
    
    if ffmpeg_process is None:
        return {"running": False}
    
    # Check if process is still running
    if ffmpeg_process.poll() is None:
        return {
            "running": True,
            "pid": ffmpeg_process.pid
        }
    else:
        ffmpeg_process = None
        return {"running": False}





