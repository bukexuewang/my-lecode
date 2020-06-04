#pragma once

#ifndef LIGHT_H
#define LIGHT_H

#include <glm\ext\vector_float3.hpp>
#include "../shader/shader.h"

static enum class LIGHT_TYPE { DIR, POINT, SPOT };

class BaseLight {
public:
	glm::vec3 ambient = glm::vec3(0.0f, 0.0f, 0.0f); // ������
	glm::vec3 diffuse = glm::vec3(0.0f, 0.0f, 0.0f); // ������
	glm::vec3 specular = glm::vec3(0.0f, 0.0f, 0.0f); // �����

	virtual void use(Shader* shader, const unsigned int index) = 0;
	void copyFrom(BaseLight* light);

protected:
	const std::string _use(Shader* shader, const unsigned int index, const LIGHT_TYPE type);
};

// ƽ�й�
class DirLight : public BaseLight {
public:
	glm::vec3 direction = glm::vec3(1.0f, 1.0f, 1.0f); // ����(�ӹ�Դ����)

	virtual void use(Shader* shader, const unsigned int index);
	void copyFrom(DirLight* light);
};

// ���Դ
class PointLight: public BaseLight {
public:
	glm::vec3 position = glm::vec3(0.0f, 0.0f, 0.0f); // λ��

	// ���ڼ����ǿ��
	float constant = 1.0f;
	float linear = 0.09f;
	float quadratic = 0.032f;

	virtual void use(Shader* shader, const unsigned int index);
	void copyFrom(PointLight* light);

protected:
	const std::string _use(Shader* shader, const unsigned int index, const LIGHT_TYPE type);
};

// �۹�
class Spotlight : public PointLight {
public:
	glm::vec3 direction = glm::vec3(1.0f, 1.0f, 1.0f); // ����(�ӹ�Դ����)

	float innerCutOff = 0.0f; // ��Բ׶�Ƕ�ֵ
	float outerCutOff = 0.0f; // ��Բ׶�Ƕ�ֵ

	virtual void use(Shader* shader, const unsigned int index);
	void copyFrom(Spotlight* light);
};

#endif