package com.sentinelops.analyzer;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.Random;

@RestController
@RequestMapping("/api/stream")
public class StreamController {

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final Random random = new Random();

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamEvents() {
        SseEmitter emitter = new SseEmitter(-1L); // Sin timeout
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));

        return emitter;
    }

    public void dispatchEvent(String payload) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("message").data(payload));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }

    @Scheduled(fixedRate = 1500)
    public void generateFallbackData() {
        if (emitters.isEmpty()) return;
        
        String[] ips = {"192.168.1.104", "10.0.5.22", "172.16.0.8", "8.8.8.8", "114.114.114.114"};
        String[] actions = {"LOGIN_SUCCESS", "DATA_EXFILTRATION_ATTEMPT", "API_RATE_LIMIT", "AUTH_FAILED", "SQL_INJECTION_DETECTED"};
        String ip = ips[random.nextInt(ips.length)];
        String action = actions[random.nextInt(actions.length)];
        
        String payload = String.format("{\"ip\": \"%s\", \"action\": \"%s\", \"fallback\": true}", ip, action);
        dispatchEvent(payload);
    }
}
