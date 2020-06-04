#pragma once

#ifndef TEXTURE_H
#define TEXTURE_H

#include <string>
#include <assimp/material.h>
#include <glad/glad.h>

#include "../loader/loader.h"

class Texture {
public:
	// ��������Ԫ
	static void active(unsigned int unit) {
		if (unit >= GL_TEXTURE0 && unit <= GL_TEXTURE31) {
			glActiveTexture(unit);
		} else if (unit >= 0 && unit <= 31) {
			glActiveTexture(GL_TEXTURE0 + unit);
		}
	}

	// ����Ԫ
	unsigned int unit = 0;
	aiTextureType type = aiTextureType_NONE; //  ��������

	// �����Ʒ�ʽ
	int wraps = GL_REPEAT;
	int wrapt = GL_REPEAT;
	float borderColor[4] = { 0.0f }; // ��Ե��ɫ�������ڻ�����GL_CLAMP_TO_BORDERʱ

	// �������
	int minFilter = GL_LINEAR_MIPMAP_LINEAR;
	int magFilter = GL_LINEAR;

	Texture* setFilename(const char* filename);

	Texture(const char* filename = "");
	~Texture();

	// ���ز�ʹ����������
	bool use(); // �Զ����ö༶��Զ����ļ���
	bool use(const int level); //  �ֶ����ö༶��Զ����ļ���

	// ������
	void bind();
	// ��¡��ǰ����
	Texture* clone();

protected:
	// ����Ŀ��
	const int TARGET = GL_TEXTURE_2D;

	unsigned int ID = 0;
	string src = "";

	// �Ƿ���ع���������
	bool isLoaded = false;

	// ���ز���������
	ImageData* _use();
};

#endif