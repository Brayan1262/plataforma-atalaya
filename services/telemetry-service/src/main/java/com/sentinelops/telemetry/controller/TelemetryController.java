package com.sentinelops.telemetry.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/telemetry")
public class TelemetryController {

    private static final Logger log = LoggerFactory.getLogger(TelemetryController.class);
    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC = "sentinel.events";

    public TelemetryController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @PostMapping("/ingest")
    public String ingestEvent(@RequestBody String payload) {
        String eventId = UUID.randomUUID().toString();
        log.info("Recibiendo evento masivo ID: {}", eventId);
        
        // Empujamos asincronamente el mensaje a Kafka
        kafkaTemplate.send(TOPIC, eventId, payload);
        
        return "Evento encolado exitosamente con ID: " + eventId;
    }
}
